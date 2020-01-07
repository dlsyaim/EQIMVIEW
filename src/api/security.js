import request from '@/utils/request'

export function fetchSecurityKey(){
    return request({
        url: '/app/security',
        method: 'get'
    })
}