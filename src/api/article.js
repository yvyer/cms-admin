import fetch from '@/utils/fetch';

export function getList() {
  return fetch({
    url: '/article/list',
    method: 'get'
  });
}

export function getArticle() {
  return fetch({
    url: '/article/detail',
    method: 'get'
  });
}

export function saveArticle(article, title) {
  const data = {
    article,
    title
  };
  return fetch({
    url: '/article/add',
    method: 'post',
    data
  });
}

export function updateArticle(article, title, pid) {
  const data = {
    article,
    title,
    pid
  };
  return fetch({
    url: '/article/update',
    method: 'post',
    data
  });
}

