export interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    shared_link_id: string | null;
    shared_collection_id: string | null;
    timestamp: Date;
    status: string;
  }