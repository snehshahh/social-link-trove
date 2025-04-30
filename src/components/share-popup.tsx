import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (friend: string) => void;
}

const friends = [
  "John Doe",
  "Jane Smith",
  "Bob Johnson",
  // Add more friends from profile section
];

export function SharePopup({ isOpen, onClose, onShare }: SharePopupProps) {
  const [selectedFriend, setSelectedFriend] = useState<string>("");

  const handleShare = () => {
    if (selectedFriend) {
      onShare(selectedFriend);
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50"
    >
      <div className="fixed inset-0 bg-black/50" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-black rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-bold text-white">
              Share Link
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-white/90">Select Friend</label>
              <select
                value={selectedFriend}
                onChange={(e) => setSelectedFriend(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white"
              >
                <option value="">Select a friend</option>
                {friends.map((friend) => (
                  <option key={friend} value={friend}>
                    {friend}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleShare}
              disabled={!selectedFriend}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg py-2 disabled:opacity-50"
            >
              Share
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
