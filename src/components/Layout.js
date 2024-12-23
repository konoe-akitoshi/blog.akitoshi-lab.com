const Layout = ({ children }) => {
    return (
      <div className="flex h-screen bg-primary">
        {/* サイドバー */}
        <aside className="w-64 bg-secondary shadow-md p-4">
          <h1 className="text-xl font-bold mb-4">My Notion</h1>
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block py-2 px-3 rounded hover:bg-gray-200">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 rounded hover:bg-gray-200">
                  Tasks
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 rounded hover:bg-gray-200">
                  Notes
                </a>
              </li>
            </ul>
          </nav>
        </aside>
  
        {/* メインコンテンツ */}
        <main className="flex-1 overflow-y-auto p-8 bg-secondary">
          {children}
        </main>
      </div>
    );
  };
  
  export default Layout;
  