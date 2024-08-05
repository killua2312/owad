import React, { useRef, useEffect } from "react";

const DisclaimerDialoge = () => {
  const dialog = useRef(null);

  useEffect(() => {
    if (dialog.current) {
      dialog.current.showModal();
    }
  }, []);

  const handleClose = () => {
    if (dialog.current && dialog.current.close) {
      dialog.current.close();
    }
  };

  return (
    <dialog
      ref={dialog}
      className="fixed inset-0 bg-background bg-opacity-75 z-40"
    >
      <div className="relative z-50 p-4 w-full max-w-lg max-auto mt-20 mx-auto my-0 bg-background text-foreground shadow-lg border-foreground border-2 rounded-xl">
        <div className="text-right">
          <button onClick={handleClose} className="text-xl font-semibold px-2">
            &times;
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-3xl font-bold">Disclaimer</h2>
          <p className="mt-2">
            This website is developed as a Proof of Concept (PoC) and for
            practice purposes only, showcasing an example of an
            Over-The-Top(OTT) platform interface with ads. It is intended for
            educational and demonstrative use, not as a commercial service.
          </p>
          <h4 className="mt-4 font-bold">Content and Rights</h4>
          <p className="mt-2">
            The content displayed here, including videos, images, and text, is
            not owned by us nor authorized for our use. It is used solely for
            the purpose of demonstration, without any intention to infringe upon
            the content owner's rights or to claim any ownership.
          </p>

          <h4 className="mt-4 font-bold">Liability</h4>
          <p className="mt-2">
            By accessing this website, you acknowledge that it is offered on an
            "as is" basis for demonstration purposes only. We bear no
            responsibility for any use of the website and disclaim all Liability
            for any direct or indirect consequences of its use.
          </p>
        </div>
      </div>
    </dialog>
  );
};

export default DisclaimerDialoge;
