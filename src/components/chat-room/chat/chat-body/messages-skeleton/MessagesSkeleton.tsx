import MessageLoadingSkeleton from '../../../../ui/message-loading-skeleton/MessageLoadingSkeleton.tsx';

const MessagesSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-2 m-auto h-[calc(100vh-152px)] overflow-auto p-2">
      {Array(8)
        .fill(null)
        .map((_item, i) => (
          <MessageLoadingSkeleton fromUser={i % 2 === 0} key={i} />
        ))}
    </div>
  );
};

export default MessagesSkeleton;
