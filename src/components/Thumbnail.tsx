import Link from 'next/link';

interface ThumbnailProps {
  title: string;
  thumbnail?: string;
  created_at: string;
  tags?: string[];
}

const Thumbnail = ({ title, thumbnail, created_at, tags }: ThumbnailProps) => (
    <div
      className="relative w-full h-64 sm:h-72 md:h-80 bg-cover bg-center rounded-2xl shadow-lg overflow-hidden border border-white/10"
      style={{ backgroundImage: thumbnail ? `url(${thumbnail})` : 'linear-gradient(135deg, #525252 0%, #262626 100%)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 sm:px-6 sm:py-5">
          <h1 className="text-2xl font-bold text-white mb-5 leading-relaxed tracking-tight drop-shadow-lg">{title}</h1>
          <div className="flex items-center justify-between text-gray-200 text-sm gap-5">
            <span className="flex items-center gap-2 flex-shrink min-w-0 text-gray-300">
              <svg className="w-4 h-4 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {new Date(created_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <div className="flex gap-2 flex-wrap justify-end flex-shrink-0">
              {tags &&
                tags.slice(0, 3).map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tags/${tag}`}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-md hover:bg-white/30 hover:scale-105 transition-all duration-200 cursor-pointer border border-white/20 hover:border-white/40 shadow-sm"
                  >
                    #{tag}
                  </Link>
                ))}
              {tags && tags.length > 3 && (
                <span className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-md backdrop-blur-sm border border-white/10 shadow-sm">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
export default Thumbnail;
  