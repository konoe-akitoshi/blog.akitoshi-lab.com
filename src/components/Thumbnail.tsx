import Link from 'next/link';

interface ThumbnailProps {
  title: string;
  thumbnail?: string;
  created_at: string;
  tags?: string[];
}

const Thumbnail = ({ title, thumbnail, created_at, tags }: ThumbnailProps) => (
    <div
      className="relative w-full h-72 bg-cover bg-center rounded-lg shadow-lg"
      style={{ backgroundImage: thumbnail ? `url(${thumbnail})` : 'none' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
        <div className="flex items-center justify-between text-mono-300 text-sm">
          <span>{new Date(created_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <div className="flex gap-2">
            {tags &&
              tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/tags/${tag}`}
                  className="px-2 py-1 bg-mono-600 text-white text-xs rounded hover:bg-mono-700 transition-colors cursor-pointer"
                >
                  #{tag}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  export default Thumbnail;
  