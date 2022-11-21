import { videoType } from "../pages";

type Type = {
  video: videoType;
};

export const VideoThumb = ({ video }: Type) => {
  return (
    <div>
      <img className="bg-#9C5D3C h-3/5 lg:h-4/5" src={video.thumbnails} />
    </div>
  );
};
