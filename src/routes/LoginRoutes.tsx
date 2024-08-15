import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../pages/main/page.tsx';

export default function LoginRoutes() {
  const routes: {path: string; Element: React.ComponentType}[] = [];
  const modules: any = import.meta.glob('/src/pages/**/page.tsx', {
    eager: true,
  });

  for (const path of Object.keys(modules)) {
    const fileName = path.match(/pages\/(?!.*?\(.*?\)\/)(.*)\/page\.tsx/)?.[1];

    if (!fileName) {
      continue;
    }

    const normalizedPathName = fileName.replace(/\[(.*?)\]/, ':$1');

    routes.push({
      path: `/${normalizedPathName}`,
      Element: modules[path].default,
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Main />} />
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.Element />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
