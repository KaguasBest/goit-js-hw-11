import { refs } from './common';

export function renderImage(imageList) {
  const markup = imageList
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="js-image-item">
          <a class="js-image-link" href="${largeImageURL}">
            <div class="js-image-card">
              <img class="js-image" src=${webformatURL} alt=${tags} loading="lazy" />
              <ul class="describe-list">
                <li class="describe-item"><span class='describe-text'>Likes</span><br>${likes}</li>
                <li class="describe-item"><span class='describe-text'>Views</span><br>${views}</li>
                <li class="describe-item"><span class='describe-text'>Comments</span><br>${comments}</li>
                <li class="describe-item"><span class='describe-text'>Downloads</span><br>${downloads}</li>
              </ul>
            </div>
          </a>
        </li>
      `
    )
    .join('');

  refs.imageBlock.insertAdjacentHTML('beforeend', markup);
}
