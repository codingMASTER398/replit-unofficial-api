var fetch = require('node-fetch') //Node fetch, used to like, fetch.
var globalheaders = {
    "authority": "replit.com",
"method": "POST",
"path": "/graphql",
"scheme": "https",
"accept": "*/*",
"accept-encoding": "gzip, deflate, br",
"accept-language": "en-GB,en;q=0.9",
"content-length": 1376,
"content-type": "application/json",
"origin": "https://replit.com",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "same-origin",
"sec-gpc": 1,
"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
"x-requested-with": "XMLHttpRequest"
}

function userdata(username) {

    return new Promise(async function(resolve,reject) {
        var heads = globalheaders
        heads['path'] = '/graphql'
        heads['method'] = 'POST'
        heads['referer'] = 'https://replit.com/@'+username

        fetch("https://replit.com/graphql", {
            "headers": heads,
            "referrer": "https://replit.com/@"+username,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify([
                {
                    "operationName": "ProfilePublicRepls",
                    "variables": {
                        "username": username,
                        "search": ""
                    },
                    "query": "query ProfilePublicRepls($username: String!, $after: String, $search: String) {\n  user: userByUsername(username: $username) {\n    id\n    profileRepls: profileRepls(after: $after, search: $search) {\n      items {\n        id\n        ...ProfilePublicReplsRepl\n        __typename\n      }\n      pageInfo {\n        hasNextPage\n        nextCursor\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment ProfilePublicReplsRepl on Repl {\n  id\n  description(plainText: true)\n  isOwner\n  pinnedToProfile\n  timeCreated\n  title\n  url\n  iconUrl\n  ...ReplLinkRepl\n  user {\n    id\n    ...UserLinkUser\n    __typename\n  }\n  lang {\n    id\n    displayName\n    __typename\n  }\n  multiplayers {\n    id\n    image\n    username\n    __typename\n  }\n  __typename\n}\n\nfragment ReplLinkRepl on Repl {\n  id\n  url\n  nextPagePathname\n  __typename\n}\n\nfragment UserLinkUser on User {\n  id\n  url\n  username\n  __typename\n}\n"
                }
            ]),
            "method": "POST",
            "mode": "cors"
        }).then(async function response(r) {
            if(r.status == 200){
                r = await r.json()
                resolve({
                    "id":r[0].data.user.id,
                    "name":username,
                    "firstTenRepls":r[0].data.user.profileRepls.items
                })
            }else{
                reject("request did not return 200 OK")
            }
        }).catch(function(err) {
            reject('userdata function failed because of the following reason: '+err)
        });  
    })
}

function search(username,repl,next) {
    return new Promise(async function(resolve,reject) {
        var heads = globalheaders
        heads['path'] = '/graphql'
        heads['method'] = 'POST'
        heads['referer'] = 'https://replit.com/@'+username

        var bodily = {}

        if(next == "lol"){
            bodily = JSON.stringify([
                {
                    "operationName": "ProfilePublicRepls",
                    "variables": {
                        "username": username,
                        "search": ""
                    },
                    "query": "query ProfilePublicRepls($username: String!, $after: String, $search: String) {\n  user: userByUsername(username: $username) {\n    id\n    profileRepls: profileRepls(after: $after, search: $search) {\n      items {\n        id\n        ...ProfilePublicReplsRepl\n        __typename\n      }\n      pageInfo {\n        hasNextPage\n        nextCursor\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment ProfilePublicReplsRepl on Repl {\n  id\n  description(plainText: true)\n  isOwner\n  pinnedToProfile\n  timeCreated\n  title\n  url\n  iconUrl\n  ...ReplLinkRepl\n  user {\n    id\n    ...UserLinkUser\n    __typename\n  }\n  lang {\n    id\n    displayName\n    __typename\n  }\n  multiplayers {\n    id\n    image\n    username\n    __typename\n  }\n  __typename\n}\n\nfragment ReplLinkRepl on Repl {\n  id\n  url\n  nextPagePathname\n  __typename\n}\n\nfragment UserLinkUser on User {\n  id\n  url\n  username\n  __typename\n}\n"
                }
            ])
        }else{
            bodily = JSON.stringify([
                {
                    "operationName": "ProfilePublicRepls",
                    "variables": {
                        "username": username,
                        "after":next,
                        "search": ""
                    },
                    "query": "query ProfilePublicRepls($username: String!, $after: String, $search: String) {\n  user: userByUsername(username: $username) {\n    id\n    profileRepls: profileRepls(after: $after, search: $search) {\n      items {\n        id\n        ...ProfilePublicReplsRepl\n        __typename\n      }\n      pageInfo {\n        hasNextPage\n        nextCursor\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment ProfilePublicReplsRepl on Repl {\n  id\n  description(plainText: true)\n  isOwner\n  pinnedToProfile\n  timeCreated\n  title\n  url\n  iconUrl\n  ...ReplLinkRepl\n  user {\n    id\n    ...UserLinkUser\n    __typename\n  }\n  lang {\n    id\n    displayName\n    __typename\n  }\n  multiplayers {\n    id\n    image\n    username\n    __typename\n  }\n  __typename\n}\n\nfragment ReplLinkRepl on Repl {\n  id\n  url\n  nextPagePathname\n  __typename\n}\n\nfragment UserLinkUser on User {\n  id\n  url\n  username\n  __typename\n}\n"
                }
            ])
        }

        fetch("https://replit.com/graphql", {
            "headers": heads,
            "referrer": "https://replit.com/@"+username,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": bodily,
            "method": "POST",
            "mode": "cors"
        }).then(async function response(r) {
            if(r.status == 200){
                r = await r.json()
                var done = false
                //r[0].data.user.profileRepls.pageInfo.nextCursor
                for (let i = 0; i < r[0].data.user.profileRepls.items.length; i++) {
                    const element = r[0].data.user.profileRepls.items[i];
                    if(element.title == repl){
                        done = true
                        resolve(element)
                    }
                }
                if(!done){
                    if(r[0].data.user.profileRepls.pageInfo.hasNextPage){
                        search(username,repl,r[0].data.user.profileRepls.pageInfo.nextCursor).then(function(eo) {
                            resolve(eo)
                        }).catch(function() {
                            reject("no")
                        })
                    }else{
                        reject("no")
                    }
                }
            }else{
                reject("request did not return 200 OK")
            }
        }).catch(function(err) {
            reject('search function failed because of the following reason: '+err)
        });
    })
}

function repldata(username,repl) {
    return new Promise(async function(resolve,reject) {
        search(username,repl).then(function(r) {
            var heads = globalheaders
            heads['path'] = '/graphql'
            heads['method'] = 'POST'
            heads['referer'] = 'https://replit.com/@'+username

            var bodily = JSON.stringify([
                {
                  "operationName": "ExploreReplView",
                  "variables": {
                    "replId": r.id
                  },
                  "query": "query ExploreReplView($replId: String!) {\n  repl(id: $replId) {\n    ... on Repl {\n      id\n      ...ReplViewRepl\n      __typename\n    }\n    __typename\n  }\n  currentUser {\n    id\n    ...ReplViewCurrentUser\n    __typename\n  }\n}\n\nfragment ReplViewRepl on Repl {\n  id\n  title\n  timeCreated\n  imageUrl\n  iconUrl\n  publicReleasesForkCount\n  publicForkCount\n  owner {\n    ... on Team {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    ... on User {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    __typename\n  }\n  derivedApps(count: 3) {\n    items {\n      id\n      ...ExploreReplCardRepl\n      __typename\n    }\n    __typename\n  }\n  relatedRepls(limitPerGroup: 3) {\n    name\n    repls {\n      id\n      publishedAs\n      ...ReplLinkRepl\n      ...ExploreReplCardRepl\n      ...TemplateReplCardRepl\n      __typename\n    }\n    __typename\n  }\n  lang {\n    id\n    displayName\n    __typename\n  }\n  currentUserPermissions {\n    containerWrite\n    publish\n    __typename\n  }\n  publishedAs\n  deployment {\n    id\n    activeRelease {\n      id\n      timeCreated\n      __typename\n    }\n    __typename\n  }\n  ...ReplViewReplViewerRepl\n  ...ReplLinkRepl\n  ...ReplViewFooterRepl\n  __typename\n}\n\nfragment ExploreReplCardRepl on Repl {\n  id\n  title\n  runCount\n  likeCount\n  imageUrl\n  url\n  description(plainText: true)\n  tags {\n    id\n    __typename\n  }\n  owner {\n    ... on User {\n      id\n      username\n      image\n      url\n      __typename\n    }\n    ... on Team {\n      id\n      username\n      image\n      url\n      __typename\n    }\n    __typename\n  }\n  multiplayers {\n    id\n    username\n    image\n    url\n    __typename\n  }\n  __typename\n}\n\nfragment ReplLinkRepl on Repl {\n  id\n  url\n  nextPagePathname\n  __typename\n}\n\nfragment TemplateReplCardRepl on Repl {\n  id\n  iconUrl\n  templateCategory\n  title\n  description(plainText: true)\n  publicReleasesForkCount\n  likeCount\n  ...ReplLinkRepl\n  owner {\n    ... on User {\n      id\n      ...TemplateReplCardFooterUser\n      __typename\n    }\n    ... on Team {\n      id\n      ...TemplateReplCardFooterTeam\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment TemplateReplCardFooterUser on User {\n  id\n  username\n  image\n  url\n  __typename\n}\n\nfragment TemplateReplCardFooterTeam on Team {\n  id\n  username\n  image\n  url\n  __typename\n}\n\nfragment ReplViewReplViewerRepl on Repl {\n  id\n  publishedAs\n  runCount\n  prodUrl: hostedUrl(dotty: true)\n  isProject\n  lang {\n    id\n    header\n    displayName\n    __typename\n  }\n  ...ReplViewerOutputOverlayRepl\n  ...UseReplViewerRepl\n  ...LikeButtonRepl\n  __typename\n}\n\nfragment ReplViewerOutputOverlayRepl on Repl {\n  id\n  title\n  imageUrl\n  lastPublishedAt\n  currentUserPermissions {\n    changeImageUrl\n    __typename\n  }\n  __typename\n}\n\nfragment UseReplViewerRepl on Repl {\n  id\n  devUrl: hostedUrl\n  url\n  lang {\n    id\n    canUseShellRunner\n    hasReplboxWebview\n    __typename\n  }\n  config {\n    isServer\n    isVnc\n    __typename\n  }\n  deployment {\n    id\n    activeRelease {\n      id\n      hostedUrl\n      __typename\n    }\n    __typename\n  }\n  ...CrosisContextRepl\n  __typename\n}\n\nfragment CrosisContextRepl on Repl {\n  id\n  language\n  slug\n  user {\n    id\n    username\n    __typename\n  }\n  currentUserPermissions {\n    containerWrite\n    __typename\n  }\n  flagOwnerDotReplitPackager: gateOnOwner(feature: \"flag-dotreplit-packager\")\n  __typename\n}\n\nfragment LikeButtonRepl on Repl {\n  id\n  currentUserDidLike\n  likeCount\n  url\n  __typename\n}\n\nfragment ReplViewFooterRepl on Repl {\n  id\n  description\n  lastPublishedAt\n  publishedAs\n  deployment {\n    id\n    activeRelease {\n      id\n      timeCreated\n      __typename\n    }\n    __typename\n  }\n  owner {\n    ... on Team {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    ... on User {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    __typename\n  }\n  source {\n    release {\n      id\n      __typename\n    }\n    deployment {\n      id\n      repl {\n        id\n        ...ReplViewSourceRepl\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  tags {\n    id\n    __typename\n  }\n  origin {\n    id\n    ...ReplViewSourceRepl\n    __typename\n  }\n  __typename\n}\n\nfragment ReplViewSourceRepl on Repl {\n  id\n  title\n  templateLabel\n  ...ReplLinkRepl\n  owner {\n    ... on Team {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    ... on User {\n      id\n      username\n      url\n      image\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ReplViewCurrentUser on CurrentUser {\n  id\n  username\n  isSubscribed\n  ...ReplViewReplViewerCurrentUser\n  __typename\n}\n\nfragment ReplViewReplViewerCurrentUser on CurrentUser {\n  id\n  ...LikeButtonCurrentUser\n  ...CrosisContextCurrentUser\n  __typename\n}\n\nfragment LikeButtonCurrentUser on CurrentUser {\n  id\n  isVerified\n  __typename\n}\n\nfragment CrosisContextCurrentUser on CurrentUser {\n  id\n  username\n  isSubscribed\n  flagTrackOtClientDataLoss: gate(feature: \"flag-ot-data-loss-client-tracking\")\n  __typename\n}\n"
                }
              ])
            fetch("https://replit.com/graphql", {
                "headers": heads,
                "referrer": 'https://replit.com/@'+username,
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": bodily,
                "method": "POST",
                "mode": "cors"
            }).then(async function response(o) {
                o = await o.json()
                if(o[0].data.repl){
                    resolve(o[0].data.repl)
                }else{
                    reject("there was an error while getting repl info")
                }
            }).catch(function(err) {
                reject("there was an error while getting repl info")
            })
        }).catch(function(err) {
            if(err == "no"){
                reject("Repl or user does not exist")
            }else{
                reject(err)
            }
        })
    })
}
function replappsdata(app,all) {
    return new Promise(async function(resolve,reject) {
        var heads = globalheaders
        heads['path'] = '/graphql'
        heads['method'] = 'POST'
        heads['referer'] = 'https://replit.com/apps/'+app

        var bodily = JSON.stringify([
            {
                "operationName": "ExploreTrendingRepls",
                "variables": {
                    "tag": app
                },
                "query": "query ExploreTrendingRepls($tag: String!) {\n  appsDialogNav: appEnvValue(key: \"APPS_DIALOG_NAV\")\n  currentUser {\n    id\n    isAdmin: hasRole(role: ADMIN)\n    isStudent: hasRole(role: STUDENT)\n    isPrivacyLimitedAccess: hasRole(role: PRIVACY_LIMITED_ACCESS)\n    __typename\n  }\n  tag(id: $tag) {\n    id\n    ...ExploreTrendingTag\n    trendingReplsFeed {\n      replIds\n      initialRepls {\n        id\n        ...ExploreReplCardRepl\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment ExploreTrendingTag on Tag {\n  id\n  replCount\n  creatorCount\n  replsTaggedTodayCount\n  isTrending\n  __typename\n}\n\nfragment ExploreReplCardRepl on Repl {\n  id\n  title\n  runCount\n  likeCount\n  imageUrl\n  url\n  description(plainText: true)\n  tags {\n    id\n    __typename\n  }\n  owner {\n    ... on User {\n      id\n      username\n      image\n      url\n      __typename\n    }\n    ... on Team {\n      id\n      username\n      image\n      url\n      __typename\n    }\n    __typename\n  }\n  multiplayers {\n    id\n    username\n    image\n    url\n    __typename\n  }\n  __typename\n}\n"
            }
        ])

        fetch("https://replit.com/graphql", {
            "headers": heads,
            "referrer": 'https://replit.com/apps/'+app,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": bodily,
            "method": "POST",
            "mode": "cors"
        }).then(async function response(r) {
            if(r.status == 200){
                r = await r.json()
                if(r[0].data && r[0].data.tag){
                    var returncurrently = {
                        "app":r[0].data.tag.id,
                        "trending":r[0].data.tag.isTrending,
                        "replcount":r[0].data.tag.replCount,
                        "repls":r[0].data.tag.trendingReplsFeed.initialRepls
                    }
                    if(all){
                        var repls = []
                        var bodily = JSON.stringify([
                            {
                              "operationName": "ExploreRepls",
                              "variables": {
                                "replIds": r[0].data.tag.trendingReplsFeed.replIds
                              },
                              "query": "query ExploreRepls($replIds: [String!]!) {\n  publicReplsByIds(ids: $replIds) {\n    id\n    ...ExploreReplCardRepl\n    __typename\n  }\n}\n\nfragment ExploreReplCardRepl on Repl {\n  id\n  title\n  runCount\n  likeCount\n  imageUrl\n  url\n  description(plainText: true)\n  tags {\n    id\n    __typename\n  }\n  owner {\n    ... on User {\n      id\n      username\n      image\n      url\n      __typename\n    }\n    ... on Team {\n      id\n      username\n      image\n      url\n      __typename\n    }\n    __typename\n  }\n  multiplayers {\n    id\n    username\n    image\n    url\n    __typename\n  }\n  __typename\n}\n"
                            }
                          ])
                        fetch("https://replit.com/graphql", {
                            "headers": heads,
                            "referrer": 'https://replit.com/apps/'+app,
                            "referrerPolicy": "strict-origin-when-cross-origin",
                            "body": bodily,
                            "method": "POST",
                            "mode": "cors"
                        }).then(async function response(o) {
                            o = await o.json()
                            if(o[0].data && o[0].data.publicReplsByIds && o[0].data.publicReplsByIds.length !== 0){
                                var returncurrently = {
                                    "app":r[0].data.tag.id,
                                    "trending":r[0].data.tag.isTrending,
                                    "replcount":r[0].data.tag.replCount,
                                    "repls":o[0].data.publicReplsByIds
                                }
                                resolve(returncurrently)
                            }else{
                                reject("there was an error while getting the repls. Maybe turn off 'all' mode.")
                            }
                        }).catch(function(err) {
                            resolve(returncurrently)
                        })
                    }else{
                        resolve(returncurrently)
                    }
                }else{
                    reject("app doesn't exist")
                }
            }else{
                reject("request did not return 200 OK")
            }
        }).catch(function(err) {
            reject('replappdata function failed because of the following reason: '+err)
        });
    })
}

function featuredrepls() {
    return new Promise(async function(resolve,reject) {
        var heads = globalheaders
        heads['path'] = '/graphql'
        heads['method'] = 'POST'
        heads['referer'] = 'https://replit.com/apps/'

        var bodily = JSON.stringify([
            {
                "operationName": "ExploreFeaturedRepls",
                "variables": {},
                "query": "query ExploreFeaturedRepls {\n  appsDialogNav: appEnvValue(key: \"APPS_DIALOG_NAV\")\n  currentUser {\n    id\n    __typename\n  }\n  featuredRepls {\n    id\n    ...ExploreReplCardRepl\n    __typename\n  }\n}\n\nfragment ExploreReplCardRepl on Repl {\n  id\n  title\n  runCount\n  likeCount\n  imageUrl\n  url\n  description(plainText: true)\n  tags {\n    id\n    __typename\n  }\n  owner {\n    ... on User {\n      id\n      username\n      image\n      url\n      __typename\n    }\n    ... on Team {\n      id\n      username\n      image\n      url\n      __typename\n    }\n    __typename\n  }\n  multiplayers {\n    id\n    username\n    image\n    url\n    __typename\n  }\n  __typename\n}\n"
            }
        ])

        fetch("https://replit.com/graphql", {
            "headers": heads,
            "referrer": 'https://replit.com/apps/',
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": bodily,
            "method": "POST",
            "mode": "cors"
        }).then(async function response(r) {
            if(r.status == 200){
                r = await r.json()
                if(r[0].data && r[0].data.featuredRepls){
                    resolve(r[0].data.featuredRepls)
                }else{
                    reject("SoMe ThInG hApPeNeD")
                }
            }else{
                reject("request did not return 200 OK")
            }
        }).catch(function(err) {
            reject('featuredrepls function failed because of the following reason: '+err)
        });
    })
}

module.exports = {
    "userdata":userdata,
    "repldata":repldata,
    "replappsdata":replappsdata,
    "featuredrepls":featuredrepls
}