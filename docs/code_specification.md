//
//  Swift.swift
//  代码规范
//
//  Created by 宋文通 on 2018/5/3.
//  Copyright © 2018年 宋文通. All rights reserved.
//
                    开发规范
#### 0.Xcode保持为最新版本开发,来处理新版本可能会出现的问题
#### 1.用户名设置为自己的中文名,方便识别,这样打开某个文件就会看到<Created by 宋文通>这种字样
#### 2.程序使用Swift语言开发,新语言已经成熟,新特性可以提高开发效率
#### 3.UI开发使用IB.开发中使用多个storyboard+xib的形式,storyboard优先,这样开发的效率会提高不少
      每个storyboard不要放多于3个UIViewcontroller
#### 4.多使用extension来区分代码块,提高可读性
    原则上是class里面只声明IBAction,IBOutlet,属性和deinit
    一个extension做父类方法重写
    对于协议的实现使用独立的一个extension
#### 5.Model都使用Codable ,原则上使用struct,不用class,struct去掉了不需要的冗余类结构
[WTKit](https://github.com/songwentong/WTKit)用于自动生成Codable代码
#### 6.熟练应用面向协议编程,处理问题用协议有时候比继承好用
                UITableViewModel.swift文件是一个很好的例子
#### 7.多看swift文档
[Swift文档](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/index.html#//apple_ref/doc/uid/TP40014097)
#### 8.使用字面表达
            举个例子,[String]比Array<String>好一点
#### 9.类型转换一般避免使用感叹号(!)
#### 10.多用guard来保证代码逻辑不会嵌套太多,专注于想要的逻辑
#### 11.开发过程中适当避免不必要的警告
#### 12.常规代码在Classes目录,常规的代码,逻辑在这里面
#### 13.通用功能在General目录,可以存一些账户信息之类的
#### 14.各种文档在Documents目录,有代码规范,后面会有API文档之类的
#### 15.storyboard和xib放在IBs目录
#### 16.图片资源放在IBs目录下,图片都用Assets.xcassets包装
#### 17.接口都参考Networking下面的API写
#### 18.有需要可以在General->Extensions目录下面加代码,比如做一些Dictionary,Array,还有UIScreen的extension
#### 19.在debug文件下使用print,release环境下关掉,宏定义区分
            项目中做了一个debugprint,叫newsPrint
#### 20.变量和方法名的声明需要见名知意
#### 21.在使用@objc的场景中如果可以用closure来避开使用@objc声明的时候尽量切换为closure
                例如Notification的handle,可以用closure
#### 22.图片缓存用Kingfisher
#### 23.编译成功再提交代码
#### 24.如果有涉及工程文件编辑的最好及时提交,以免引起冲突
#### 25.工程配置好的包名,证书,team不要修改,因为用于打包
#### 26.多看[苹果开发文档](https://developer.apple.com/library/content/navigation/)
#### 27.通知的声明参考系统的通知,做一个Notification的extension
                例如
                extension Notification.Name{
                static let LoginViewControllerUserDidLogIn: NSNotification.Name = NSNotification.Name.init("LoginViewControllerUserDidLogIn")//登录
                static let LoginViewControllerUserDidLogOut: NSNotification.Name = NSNotification.Name.init("LoginViewControllerUserDidLogOut")//登出
                }
#### 28.如果一个protocol的方法是可选的话,可以用extension来做一个默认的实现
                例如
                protocol LoginViewControllerDelegate: class {
                func loginVCDidLogin(_ vc:LoginViewController) -> Void//登录
                func loginVCDidCancel(_ vc:LoginViewController) -> Void//取消
                }
                extension LoginViewControllerDelegate {
                func loginVCDidLogin(_ vc:LoginViewController) -> Void{}
                func loginVCDidCancel(_ vc:LoginViewController) -> Void{}
                }

#### 29.protocol继承自AnyObject才可以作为delegate(weak var)
            例如这样
            protocol LoginViewControllerDelegate: AnyObject {}
            或者这样(不推荐)
            protocol LoginViewControllerDelegate: class {}
#### 30.Objective-C的库在News-Bridging-Header里面import
#### 31.Copyright下面建议加上本文件的内容概括
#### 32.在tableviewcell的自定义类中重写resignFirstResponder让输入框resignFirstResponder
#### 33.TableView和CollectionView的使用建议参考UITableViewModel.swift和UICollectionViewCellModel.swift的使用方案
#### 34.使用SwiftPackageManager管理包
#### 35.接口文档地址
#### 36.网页文档地址
#### 37
#### 38
#### 39
#### 40
