import Layout from '../../layout/Layout.tsx';
import Container from '../../components/container/Container.tsx';

import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const userNameInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');

  const connectToRoom = () => {
    const userName = userNameInputRef?.current?.value;

    if (!userName) return setError('Please type your name.');

    sessionStorage.setItem('userName', userName);

    navigate('/chat');
  };

  const resetError = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target.value && error) {
      setError('');
    }
  };

  return (
    <Layout>
      <Container>
        <div className={'flex flex-col border m-auto mt-24 w-96 rounded'}>
          <span className={'text-center font-bold text-2xl text-blue-500 my-5'}>
            Welcome to Chat!
          </span>
          <div className={'flex flex-col gap-3  p-2 rounded  justify-between'}>
            <input
              type={'text'}
              ref={userNameInputRef}
              placeholder={'Type your name'}
              className={'border rounded p-1 focus:outline-blue-700'}
              onChange={resetError}
            />

            {error && <span className={'text-red-500 text-sm'}>{error}</span>}

            <button className={'bg-gray-600 text-white p-2 rounded '} onClick={connectToRoom}>
              Connect to room
            </button>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
