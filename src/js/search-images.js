import SimpleLightbox from 'simplelightbox';
// Import style block
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './common';
import { imagesQuery } from './api';
import Notiflix from 'notiflix';
import { loadMoreBtnAdd } from '..';
import { renderImage } from './render-image';

let searchValues;
let lightbox;
let totalHits;
let page = 1;
let perPage = 10;

async function onClickSearchForm(event) {
  event.preventDefault();
  newSearch();

  searchValues = refs.formInput.value.trim();
  if (!searchValues) {
    console.log('Please enter your search query!');
    Notiflix.Notify.failure('Please enter your search query!');
    return;
  }
  try {
    const response = await imagesQuery(searchValues);
    const imageList = response.hits;
    totalHits = response.totalHits;
    if (totalHits) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    if (!imageList.length) {
      console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    renderImage(imageList);
    lightbox = new SimpleLightbox('.js-image-link');
    loadMoreBtnAdd();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(`${error}`);
  }
}

function newSearch() {
  page = 1;
  if (!refs.btnLoadMore.classList.contains('hidden')) {
    refs.btnLoadMore.classList.add('hidden');
  }
  refs.imageBlock.innerHTML = '';
}

async function onClickBtnLoadMore() {
  refs.btnLoadMore.classList.add('hidden');
  page += 1;
  try {
    const response = await imagesQuery(searchValues);
    const imageList = response.hits;
    totalHits = response.totalHits;
    renderImage(imageList);
    lightbox.refresh();
    loadMoreBtnAdd();
    smoothScrollGallery();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(`${error}`);
  }
}

function smoothScrollGallery() {
  const { height } = refs.imageBlock.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

export {
  perPage,
  page,
  searchValues,
  totalHits,
  onClickSearchForm,
  onClickBtnLoadMore,
  lightbox,
};
