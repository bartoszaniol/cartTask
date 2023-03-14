const Backdrop = (props: { onClose?: () => void }) => {
  return (
    <div
      className="bg-zinc-600 h-screen fixed inset-0 z-20 bg-opacity-80"
      onClick={props.onClose}
    ></div>
  );
};

export default Backdrop;
