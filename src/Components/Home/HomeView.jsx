import { useEffect, useState } from 'react';
import s from './HomeView.module.css';
import request from '../../service/apiRequest';
import Gallery from '../Gallery/Gallery';
import DownloadView from '../DownloadView/DownloadView';
import NotFoundView from '../NotFoundView/NotFoundView';
import ReactPaginate from 'react-paginate';

export default function HomeView() {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);
  const { total_pages, results } = data;

  // Paginations settings
  // =================================================================
  const [currentPage, setCurrentPage] = useState(1);
  const initialPage = currentPage - 1;
  const HandleChange = e => {
    setCurrentPage(e.selected + 1);
  };
  // =================================================================

  useEffect(() => {
    setStatus('pending');
    request
      .getTrendFilms(currentPage)
      .then(data => {
        setData(data);

        if (data.results.length > 0) {
          setStatus('resolved');
        }
      })
      .catch(error => {
        setStatus('rejected');
        throw error;
      });
  }, [currentPage]);

  if (status === 'idle') {
    return <DownloadView />;
  }
  if (status === 'pending') {
    return <DownloadView />;
  }
  if (status === 'resolved') {
    return (
      <>
        <Gallery data={results} />

        <ReactPaginate
          pageCount={total_pages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          initialPage={initialPage}
          disableInitialCallback
          onPageChange={HandleChange}
          containerClassName={s.pagination}
          pageClassName={s.page_item}
          activeClassName={s.page_item__active}
          previousClassName={s.previousButton}
          nextClassName={s.nextButton}
          pageLinkClassName={s.page_link}
          breakLinkClassName={s.ellipsis}
        />
      </>
    );
  }
  return <NotFoundView />;
}
