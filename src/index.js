// // Smport JS block
import {
  onClickBtnLoadMore,
  onClickSearchForm,
  page,
  perPage,
  totalHits,
} from './js/search-images';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/common';

refs.formSearch.addEventListener('submit', onClickSearchForm);
refs.btnLoadMore.addEventListener('click', onClickBtnLoadMore);

function loadMoreBtnAdd() {
  const totalPages = Math.ceil(totalHits / perPage);
  if (totalPages > page) {
    refs.btnLoadMore.classList.remove('hidden');
  }
}
export { loadMoreBtnAdd };
