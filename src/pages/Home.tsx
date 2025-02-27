import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

// project
import SearchBar from '../components/SearchBar.tsx';
import FormButton from '../components/FormButton.tsx';
import SimpleBookCard from '../components/SimpleBookCard.tsx';
import {CategoryType} from '../store/types.tsx';
import AddBook from './form/AddBook.tsx';
import {useSideBarStore} from '../store/store.tsx';
import get, {post} from '../api/api.ts';

// css
import {Button, Pagination} from 'flowbite-react';
import {FaBars} from 'react-icons/fa6';
import {Header} from "../components/header";

function Home(): React.JSX.Element {
  // 상태관리
  const navigate = useNavigate();
  const toggle = useSideBarStore((state) => state.toggleIsOpened);
  const [isModalOpened, setModalOpened] = useState<boolean>(false);
  const [novelList, setNovelList] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 10,
    totalElements: 1,
    currentPage: 1,
  });
  const categories: CategoryType[] = Object.values(CategoryType);
  const isNovelListEmpty = Array.isArray(novelList) && novelList.length === 0;

  // handler
  const handlePageChange = (page: number) => {
    setPageInfo((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  // logout
  const logout = async () => {
    const url = `auth/logout`;
    try {
      await post({url: url});
      localStorage.removeItem('accessToken');
      navigate('/auth');
    } catch (err) {
      console.error(err);
    }
  }

  // api
  const fetchNovelList = async (page: number) => {
    const res = await get({
      url: `api/admin/novels?page=${page}&size=20`,
    });
    setNovelList(res.data.data.novelList);
    setPageInfo((prev) => ({
      ...prev,
      totalPages: res.data.data.totalPages,
      totalElements: res.data.data.totalElements,
    }))
    return res;
  };

  const {error} = useQuery({
    queryKey: ['novels', pageInfo.currentPage],
    queryFn: () => fetchNovelList(pageInfo.currentPage),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  })

  if (error) {
    console.error(error.message);
  }
  return (
    <>
      {/* Mobile logo section */}
      {/* TODO: 검색바 mobile 버전에 어울리게 변경 */}
      <div className='md:hidden'>
        <Header/>
      </div>

      {/* Desktop logo & search section */}
      <section className='hidden md:flex md:flex-col w-full bg-main justify-center items-center gap-2 h-72'>
        <div className="absolute top-5 left-8 md:flex md:flex-row gap-5">
          <button onClick={toggle}>
            <FaBars size={18} className="fill-button-text"/>
          </button>
          <button onClick={logout} className="text-button-text font-medium text-sm">로그아웃</button>
        </div>
        <Link to="/" className='w-1/3 md:mt-10'>
          <img alt="logo" src="/logo.png"/>
        </Link>
        <div className="md:w-1/2">
          <SearchBar defaultQuery=''/>
        </div>
      </section>

      {/* book list container */}
      <div className='container mx-auto mt-2 md:max-w-5xl pb-20 md:mt-10'>
        <div className="flex flex-col w-full divide-y">
          <div className="flex justify-between mb-2 px-1">
            <span className="text-xl font-bold content-end">서적목록</span>
            <FormButton onClick={() => setModalOpened(true)} label="새 작품 만들기"/>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1 px-1 py-2">
            {categories.map((category: CategoryType, index) => (
              <Button key={index} pill size="xs" color="gray"
                      className={`text-line focus:ring-0 text-nowrap`}>{category}</Button>
            ))
            }
          </div>
        </div>
        <div className='grid grid-cols-3 mx-auto mt-5 justify-items-center gap-x-1 gap-y-5 md:gap-y-10 md:grid-cols-5'>
          {!isNovelListEmpty ? (
            novelList.map((novel) => (
              <Link key={novel.id} to={`/novel/${novel.id}`}>
                <SimpleBookCard
                  title={novel.title}
                  author={novel.authorList.join(', ')}
                  coverImageUrl={novel.coverImageUrl}
                />
              </Link>
            ))
          ) : (
            <div>소설 목록이 없습니다.</div>
          )}
        </div>

        {/* 페이지 번호 */}
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={pageInfo.currentPage}
            onPageChange={handlePageChange}
            totalPages={pageInfo.totalPages}
            previousLabel=""
            nextLabel=""
            showIcons
          />
        </div>
      </div>

      {/* open modal */}
      {isModalOpened && (
        <div>
          <AddBook isOpened={isModalOpened} onClose={() => setModalOpened(false)}/>
        </div>
      )}
    </>
  );
}

export default Home;