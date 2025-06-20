import styled from 'styled-components';

interface ModalProps {
    message: string;
    onClose: () => void;
}

const Modal = ({ message, onClose }: ModalProps) => {
    return (
        <Overlay>
            <Content>
                <p>{message}</p>
                <button onClick={onClose}>확인</button>
            </Content>
        </Overlay>
    );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Content = styled.div`
  background: white;
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;

  & > button {
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #E60074;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }
`;
