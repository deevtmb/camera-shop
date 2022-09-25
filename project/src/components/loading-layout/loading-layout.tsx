import {RotatingLines} from 'react-loader-spinner';

export default function LoadingLayout() {
  return (
    <div className="spinner" data-testid="loading component">
      <RotatingLines strokeColor="#7575e2" width="100" />
    </div>
  );
}
