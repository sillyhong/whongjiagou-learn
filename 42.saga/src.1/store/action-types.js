//异步加1，这个动作是给saga发的，saga会监听这个动作进行业务处理，处理完成后会派发真正修改状态 的动作
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const INCREMENT = 'INCREMENT';