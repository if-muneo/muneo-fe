import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Button from "../components/Button";
import logoHeader from "../assets/logos/logo-header.png";
import { formatBotMessage } from "../util/formatBoxMessage";

const ChatWrapper = styled.div`
  width: 840px;
  height: 640px;
  max-height: 90vh;
  background-color: #fef2f2;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;

const ChatHeader = styled.div`
  background-color: #ffd5dc;
  padding: 16px;
  font-weight: bold;
  text-align: center;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

const InputBar = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  padding: 12px;
  background-color: #f9f9f9;
  gap: 8px;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  height: 40px;
`;

const SendButton = styled(Button)`
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #f16c90, #ff99b4);
  color: white;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const BotMessage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const UserMessage = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #ffe066;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const SpeechBubble = styled.div`
  position: relative;
  background-color: white;
  padding: 10px 12px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  line-height: 1.5;
  max-width: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 12px;
    left: -8px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-right: 8px solid white;
    border-bottom: 6px solid transparent;
  }
`;

const SpeechBubbleUser = styled.div`
  position: relative;
  background-color: white;
  padding: 10px 12px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  line-height: 1.5;
  max-width: 70%;

  &::before {
    content: "";
    position: absolute;
    top: 12px;
    right: -8px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-left: 8px solid white;
    border-bottom: 6px solid transparent;
  }
`;

const TypingBubble = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0px 10px 0px; // 여유 있게

  & span {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: #999;
    border-radius: 50%; // 꼭 이걸로 둥글게!
    animation: bounce 1.2s infinite ease-in-out both;
  }

  & span:nth-child(2) {
    animation-delay: 0.2s;
  }

  & span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.4);
    opacity: 1;
  }
}
`;

type ChatMessage = {
  sender: string;
  content: string;
  loading?: boolean;
  streamId?: string;
  done?: boolean;
};

const ChatbotUI: React.FC = () => {
  const name = localStorage.getItem("username") || "";
  const [username, setUsername] = useState(name);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const stompRef = useRef<Stomp.Client | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBodyRef.current?.scrollTo(0, chatBodyRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        content: "안녕하세요, U+ 상담챗봇 무너입니다.\n무엇을 도와드릴까요?",
        streamId: "intro"
      },
    ]);

    const socket = new SockJS(`http://localhost:8080/ws?username=${encodeURIComponent(username)}`);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe("/user/queue/public", (msg) => {
        const payload: ChatMessage = JSON.parse(msg.body);
        if (!payload.streamId) return;

        setMessages((prev) => {
          const existingIndex = prev.findIndex(m => m.streamId === payload.streamId);
          if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex] = {
              ...updated[existingIndex],
              content: updated[existingIndex].content + payload.content,
              loading: !payload.done
            };
            return updated;
          }

          return [
            ...prev,
            {
              sender: "bot",
              content: payload.content,
              streamId: payload.streamId,
              loading: !payload.done,
            },
          ];
        });
      });

      stompRef.current = client;
    });

    return () => {
      if (client.connected) client.disconnect(() => {
        console.log("disconnect");
      });
    };
  }, []);

  const send = () => {
    if (!input.trim() || !stompRef.current?.connected) return;
    const streamId = crypto.randomUUID();

    const userMsg: ChatMessage = { sender: username, content: input };
    const botMsg: ChatMessage = {
      sender: "bot",
      content: "",
      streamId,
      loading: true
    };

    stompRef.current.send("/pub/chat/message", {}, JSON.stringify({
      sender: username,
      content: input,
      streamId,
    }));

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <ChatWrapper>
      <ChatHeader>U+ 상담챗봇 무너</ChatHeader>
      <ChatBody ref={chatBodyRef}>
        {messages.map((m, i) =>
          m.sender === "bot" ? (
            <BotMessage key={m.streamId ?? i}>
              <Avatar><img src={logoHeader} alt="로고" /></Avatar>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>무너</div>
                <SpeechBubble>
                  {m.loading && !m.content.trim() ? (
                    <TypingBubble><span /><span /><span /></TypingBubble>
                  ) : (
                    formatBotMessage(m.content).map((line, idx) => (
                      <p key={idx} style={{ margin: 0 }}>{line}</p>
                    ))
                  )}
                </SpeechBubble>
              </div>
            </BotMessage>
          ) : (
            <UserMessage key={i}>
              <SpeechBubbleUser>
                {formatBotMessage(m.content).map((line, idx) => (
                  <p key={idx} style={{ margin: 0 }}>{line}</p>
                ))}
              </SpeechBubbleUser>
            </UserMessage>
          )
        )}
      </ChatBody>
      <InputBar>
        <StyledInput
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && send()}
        />
        <SendButton onClick={send}>➤</SendButton>
      </InputBar>
    </ChatWrapper>
  );
};

export default ChatbotUI;
