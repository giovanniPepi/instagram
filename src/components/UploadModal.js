import useClickOutside from "../functions/useClickOutside";
import UploadPage from "./UploadPage";

const UploadModal = ({ setShowUploadModal }) => {
  const domNode = useClickOutside(() => {
    setShowUploadModal(false);
  });

  return (
    <div className="postOverlayParent">
      <div className="uploadModalOverlay" ref={domNode}>
        <UploadPage setShowUploadModal={setShowUploadModal} />
      </div>
    </div>
  );
};

export default UploadModal;
