import fetch from '@/utils/fetch';

export function getList() {
  return fetch({
    url: '/page/list',
    method: 'get'
  });
}

export function getInfo(pid) {
  return fetch({
    url: '/page/info?pid=' + pid,
    method: 'get'
  });
}

export function getTitle(pid) {
  return fetch({
    url: '/page/title?pid=' + pid,
    method: 'get'
  });
}

export function delPage(pid) {
  var data = {
    pid
  }
  return fetch({
    url: '/page/del',
    method: 'post',
    data
  });
}

