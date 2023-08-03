import { css } from '@emotion/css';

const ModalDefault = (props: { children: React.ReactNode, showModal: boolean }) => {
  return (
    <>
      {props.showModal ? (
        <div className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          flex-direction: column;
          background-color:rgba(0, 0, 0, 0.7);
          min-height: 100vh;
          max-width: 500px;
          width: 100%;
          z-index: 10;
        `}>
          {props.children}
        </div>
      ) : null}
    </>
  )
};

export default ModalDefault;