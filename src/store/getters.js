const getters = {
    token: state => state.user.token,
    realname: state => state.user.realname,
    roles: state => state.user.roles,
    addRouters: state => state.permission.addRouters,
    sidebar: state => state.app.sidebar,
    permission_routers: state => state.permission.routers,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    notice : state => state.user.notice,
    language : state => state.app.language,
    security_query: state => state.security.query,
    hash: state => state.security.hash,
    ase: state => state.security.ase
}
export default getters;
  