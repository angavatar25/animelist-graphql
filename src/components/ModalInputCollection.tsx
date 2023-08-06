import { css } from '@emotion/css';
import { ButtonRounded, ImageResize, InputBase, MainTitle } from '../style/GeneralStyle';
import timesIcon from '../images/icon/icon-times.svg';
import ModalDefault from './ModalDefault';

interface IModalInputToCollection {
  showInputCollectionModal?: boolean;
  showCollectionExist: boolean;
  collectionName: string;
  onChangeCollectionName: (value: string) => void;
  addCollection?(): void;
  onCloseInputCollection?(): void;
};

const ModalInputCollection = (props: IModalInputToCollection) => {
  const { 
    showInputCollectionModal = false,
    showCollectionExist = false,
  } = props;

  const handleInputCollectionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChangeCollectionName) {
      props.onChangeCollectionName(e.target.value);
    }
  }

  return(
    <ModalDefault
      showModal={showInputCollectionModal}
    >
      <div className={css`
        background-color: #ECECF2;
        max-width: 80%;
        width: 100%;
        border-radius: 10px;
        padding: 20px;
        position: absolute;
      `}>
        <div className={css`
          margin-bottom: 30px;
        `}>
          <div className={css`
            display: flex;
            justify-content: space-between;
          `}>
            <MainTitle className={css`
              text-align: center;
              margin: auto 0;
            `}>New collection
            </MainTitle>
            <ImageResize
              onClick={props.onCloseInputCollection}
              width="40px"
              height="40px"
              src={timesIcon}
            />
          </div>
        </div>
        <div className={css`position: relative; text-align: center;`}>
          <InputBase
            value={props.collectionName}
            onChange={handleInputCollectionName}
            type="text"
            placeholder="Input collection name"
          />
          {showCollectionExist ? (
            <p className={css`
              color: #dc4242;
              `}
            >
              Collection exist
            </p>
          ) : null}
          <ButtonRounded
            onClick={props.addCollection}
            backgroundColor="#FFF"
            padding="10px 20px"
            className={css`
              margin-top: 20px;
              color: #0A50A3;
              border: 1px solid #0A50A3;
            `}
          >
            Add collection
          </ButtonRounded>
        </div>
      </div>
    </ModalDefault>
  )
}

export default ModalInputCollection;