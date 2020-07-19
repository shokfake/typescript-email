export class  ErrorCode {
    public static readonly success:number = 200 // 成功
    public static readonly favidSession:number = 202 //非法session
    public static readonly not_logged:number = 601 // 未登录错误
    public static readonly business:number = 602 // 业务错误
    public static readonly custom:number = 603 // 自定义错误
    public static readonly system:number = 604 // 系统异常
    
}