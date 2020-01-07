import request from '@/utils/request'


export function fetchList(data) {
  return request({
    url: '/person/list',
    method: 'post',
    data
  })
}

export function saveDate(data){
  return request({
    url: '/person/add',
    method: 'post',
    data
  })
}

export function deleteData(tabeCheckList){
  const ids = [] ;
  tabeCheckList.forEach(element => {
    ids.push(element.id);
  });
  return request({
    url: '/person/delete',
    method: 'post',
    data:JSON.stringify(ids)
  })
}