Swift简介
=============

###Swift是什么？
 
Swift是苹果于WWDC 2014发布的编程语言，这里引用The Swift Programming Language的原话：
 
> Swift is a new programming language for iOS and OS X apps that builds on the best of C and Objective-C, without the constraints of C compatibility.
 
> Swift adopts safe programming patterns and adds modern features to make programming easier, more flexible and more fun.
 
> Swift’s clean slate, backed by the mature and much-loved Cocoa and Cocoa Touch frameworks, is an opportunity to imagine how software development works.
 
> Swift is the first industrial-quality systems programming language that is as expressive and enjoyable as a scripting language.
 
简单的说：
- Swift用来写iOS和OS X程序。
- Swift吸取了C和Objective-C的优点，且更加强大易用。
- Swift可以使用现有的Cocoa和Cocoa Touch框架。
- Swift兼具编译语言的高性能（Performance）和脚本语言的交互性（Interactive）。
 
###Swift语言概览
 
####1、基本概念
 
#####1）Hello, world
类似于脚本语言，下面的代码即是一个完整的Swift程序。

```swift
println("Hello, world") 
```

#####2）变量与常量
**Swift**使用**var声明变量**，**let声明常量**。
```swift
var myVariable = 42 
myVariable = 50 
let myConstant = 42 
```

#####3）类型推导
**Swift**支持**类型推导**（Type Inference），所以上面的代码不需指定类型，如果需要指定类型：
```swift
let explicitDouble : Double = 70 
```
**Swift不支持隐式类型转换**（Implicitly casting），所以下面的代码需要显式类型转换（Explicitly casting）：
```swift
let label = "The width is " 
let width = 94 
let width = label + String(width) 
```

#####4、字符串格式化
**Swift**使用`\(item)的形式`进行**字符串格式化**：
```swift
let apples = 3 
let oranges = 5 
let appleSummary = "I have \(apples) apples." 
let appleSummary = "I have \(apples + oranges) pieces of fruit." 
```

####2、数组和字典

**Swift**使用`[]操作符`**声明数组**（array）和**字典**（dictionary）：
```swift
var shoppingList = ["catfish", "water", "tulips", "blue paint"] 
shoppingList[1] = "bottle of water" 
  
var occupations = [ 
    "Malcolm": "Captain", 
    "Kaylee": "Mechanic", 
] 
occupations["Jayne"] = "Public Relations" 
```
一般使用**初始化器**（initializer）语法**创建空数组和空字典**：
```swift
let emptyArray = String[]() 
let emptyDictionary = Dictionary<String, Float>() 
```
如果**类型信息已知**，则可以**使用[]声明空数组**，**使用[:]声明空字典**。
 
####3、控制流
#####1）概览
**Swift**的**条件语句**包含**if**和**switch**，**循环语句**包含**for-in**、**for**、**while**和**do-while**，**循环/判断条件不需要括号**，但**循环/判断体**（body）**必需括号**：
```swift
let individualScores = [75, 43, 103, 87, 12] 
var teamScore = 0 
for score in individualScores { 
    if score > 50 { 
        teamScore += 3 
    } else { 
        teamScore += 1 
    } 
} 
```

#####2）可空类型
结合**if和let**，可以方便的**处理可空变量**（nullable variable）。对于**空值**，需要**在类型声明后添加`?`显式标明该类型可空**。
```swift
var optionalString: String? = "Hello" 
optionalString == nil 
  
var optionalName: String? = "John Appleseed" 
var gretting = "Hello!" 
if let name = optionalName { 
    gretting = "Hello, \(name)" 
} 
```

#####3）灵活的switch
Swift中的switch支持各种各样的比较操作：
```swift
let vegetable = "red pepper" 
switch vegetable { 
case "celery": 
    let vegetableComment = "Add some raisins and make ants on a log." 
case "cucumber", "watercress": 
    let vegetableComment = "That would make a good tea sandwich." 
case let x where x.hasSuffix("pepper"): 
    let vegetableComment = "Is it a spicy \(x)?" 
default: 
    let vegetableComment = "Everything tastes good in soup." 
} 
```

#####4）其它循环
**for-in**除了**遍历数组**也可以用来**遍历字典**：
```swift
let interestingNumbers = [ 
    "Prime": [2, 3, 5, 7, 11, 13], 
    "Fibonacci": [1, 1, 2, 3, 5, 8], 
    "Square": [1, 4, 9, 16, 25], 
] 
var largest = 0 
for (kind, numbers) in interestingNumbers { 
    for number in numbers { 
        if number > largest { 
            largest = number 
        } 
    } 
} 
largest 
```

**while循环**和**do-while循环**：
```swift
var n = 2 
while n < 100 { 
    n = n * 2 
} 
n 
  
var m = 2 
do { 
    m = m * 2 
} while m < 100 
m 
```

Swift支持传统的**for循环**，此外也可以通过结合**`..`**（生成一个区间）和**for-in**实现同样的逻辑。
```swift
var firstForLoop = 0 
for i in 0..3 { 
    firstForLoop += i 
} 
firstForLoop 
  
var secondForLoop = 0 
for var i = 0; i < 3; ++i { 
    secondForLoop += 1 
} 
secondForLoop 
```

**【注】**  **Swift**除了**`..`**还有**`...`**：**`..`**生成**前闭后开的区间**，而**`...`**生成**前闭后闭的区间**。
 
####4、函数和闭包
#####1）函数
Swift使用**func**关键字**声明函数**：
```swift
func greet(name: String, day: String) -> String { 
    return "Hello \(name), today is \(day)." 
} 
greet("Bob", "Tuesday") 
```

通过**元组**（Tuple）**返回多个值**：
```swift
func getGasPrices() -> (Double, Double, Double) { 
    return (3.59, 3.69, 3.79) 
} 
getGasPrices() 
```

支持带有**变长参数**的**函数**：
```swift
func sumOf(numbers: Int...) -> Int { 
    var sum = 0 
    for number in numbers { 
        sum += number 
    } 
    return sum 
} 
sumOf() 
sumOf(42, 597, 12) 
```

函数也可以嵌套函数：
```swift
func returnFifteen() -> Int { 
    var y = 10 
    func add() { 
        y += 5 
    } 
    add() 
    return y 
} 
returnFifteen() 
```

作为头等对象，**函数**既可以**作为返回值**，也可以**作为参数**传递：
```swift
func makeIncrementer() -> (Int -> Int) { 
    func addOne(number: Int) -> Int { 
        return 1 + number 
    } 
    return addOne 
} 
var increment = makeIncrementer() 
increment(7) 
 
func hasAnyMatches(list: Int[], condition: Int -> Bool) -> Bool { 
    for item in list { 
        if condition(item) { 
            return true 
        } 
    } 
    return false 
} 
func lessThanTen(number: Int) -> Bool { 
    return number < 10 
} 
var numbers = [20, 19, 7, 12] 
hasAnyMatches(numbers, lessThanTen) 
```

#####2）闭包
本质来说，函数是特殊的闭包，**Swift**中可以利用**`{}`声明匿名闭包**：
```swift
numbers.map({ 
    (number: Int) -> Int in 
    let result = 3 * number 
    return result 
}) 
```
当闭包的类型已知时，可以使用下面的简化写法：
```swift
numbers.map({ number in 3 * number }) 
```
此外还可以通过参数的位置来使用参数，当函数最后一个参数是闭包时，可以使用下面的语法：
```swift
sort([1, 5, 3, 12, 2]) { $0 > $1 } 
```

####5、类和对象
#####1）创建和使用类
Swift使用class创建一个类，类可以包含字段和方法：
```swift
class Shape { 
    var numberOfSides = 0 
    func simpleDescription() -> String { 
        return "A shape with \(numberOfSides) sides." 
    } 
} 
```
创建Shape类的实例，并调用其字段和方法。
```swift
var shape = Shape() 
shape.numberOfSides = 7 
var shapeDescription = shape.simpleDescription() 
```
通过**init构建对象**，既可以使用**self显式引用成员字段**（name），也可以**隐式引用**（numberOfSides）。
```swift
class NamedShape { 
    var numberOfSides: Int = 0 
    var name: String 
  
    init(name: String) { 
        self.name = name 
    } 
  
    func simpleDescription() -> String { 
        return "A shape with \(numberOfSides) sides." 
    } 
} 
```
使用**deinit**进行**清理**工作。
 
#####2）继承和多态
**Swift支持继承和多态**（override父类方法）：
```swift
class Square: NamedShape { 
    var sideLength: Double 
  
    init(sideLength: Double, name: String) { 
        self.sideLength = sideLength 
        super.init(name: name) 
        numberOfSides = 4 
    } 
  
    func area() -> Double { 
        return sideLength * sideLength 
    } 
  
    override func simpleDescription() -> String { 
        return "A square with sides of length \(sideLength)." 
    } 
} 
let test = Square(sideLength: 5.2, name: "my test square") 
test.area() 
test.simpleDescription() 
```
**【注】**  如果这里的simpleDescription方法没有被标识为override，则会引发编译错误。
 
#####3）属性
为了简化代码，**Swift**引入了**属性（property）**，见下面的perimeter字段：
```swift
class EquilateralTriangle: NamedShape { 
    var sideLength: Double = 0.0 
 
    init(sideLength: Double, name: String) { 
        self.sideLength = sideLength 
        super.init(name: name) 
        numberOfSides = 3 
    } 
 
    var perimeter: Double { 
    get { 
        return 3.0 * sideLength 
    } 
    set { 
        sideLength = newValue / 3.0 
    } 
    } 
 
    override func simpleDescription() -> String { 
        return "An equilateral triagle with sides of length \(sideLength)." 
    } 
} 
var triangle = EquilateralTriangle(sideLength: 3.1, name: "a triangle") 
triangle.perimeter 
triangle.perimeter = 9.9 
triangle.sideLength 
```
**【注】**  **赋值器（setter）中，接收的值被自动命名为newValue。**
 
#####4）willSet和didSet
EquilateralTriangle的构造器进行了如下操作：
- 1、为子类型的属性赋值。
- 2、调用父类型的构造器。
- 3、修改父类型的属性。
 
如果不需要计算属性的值，但需要在赋值前后进行一些操作的话，使用**willSet**和**didSet**：

```swift
class TriangleAndSquare { 
    var triangle: EquilateralTriangle { 
    willSet { 
        square.sideLength = newValue.sideLength 
    } 
    } 
    var square: Square { 
    willSet { 
        triangle.sideLength = newValue.sideLength 
    } 
    } 
    init(size: Double, name: String) { 
        square = Square(sideLength: size, name: name) 
        triangle = EquilateralTriangle(sideLength: size, name: name) 
    } 
} 
var triangleAndSquare = TriangleAndSquare(size: 10, name: "another test shape") 
triangleAndSquare.square.sideLength 
triangleAndSquare.square = Square(sideLength: 50, name: "larger square") 
triangleAndSquare.triangle.sideLength 
```
从而保证triangle和square拥有相等的sideLength。
 
#####5）调用方法
**Swift**中，函数的参数名称只能在函数内部使用，但方法的参数名称除了在内部使用外还可以在外部使用（第一个参数除外），例如：
```swift
class Counter { 
    var count: Int = 0 
    func incrementBy(amount: Int, numberOfTimes times: Int) { 
        count += amount * times 
    } 
} 
var counter = Counter() 
counter.incrementBy(2, numberOfTimes: 7) 
```

**【注】**  Swift支持为方法参数取别名：在上面的代码里，numberOfTimes面向外部，times面向内部。
 
#####6）?的另一种用途
使用**可空值**时，**?**可以出现在**方法**、**属性**或**下标前面**。*如果?前的值为nil，那么?后面的表达式会被忽略，而原表达式直接返回nil*，例如：
```swift
let optionalSquare: Square? = Square(sideLength: 2.5, name: "optional  
square") 
let sideLength = optionalSquare?.sideLength 
```
当optionalSquare为nil时，sideLength属性调用会被忽略。
 
####6、枚举和结构
 
#####1）枚举
使用**enum**创建枚举——注意Swift的枚举可以**关联方法**：
```swift
enum Rank: Int { 
    case Ace = 1 
    case Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten 
    case Jack, Queen, King 
        func simpleDescription() -> String { 
        switch self { 
            case .Ace: 
                return "ace" 
            case .Jack: 
                return "jack" 
            case .Queen: 
                return "queen" 
            case .King: 
                return "king" 
            default: 
                return String(self.toRaw()) 
        } 
    } 
} 
let ace = Rank.Ace 
let aceRawValue = ace.toRaw() 
```
使用toRaw和fromRaw在原始（raw）数值和枚举值之间进行转换：
```swift
if let convertedRank = Rank.fromRaw(3) { 
    let threeDescription = convertedRank.simpleDescription() 
} 
```
**【注】**  
- **枚举**中的**成员值**（member value）是**实际的值**（actual value），和**原始值**（raw value）**没有必然关联**。
 
- **一些情况**下枚举不存在有意义的原始值，这时可以直接**忽略原始值**。

```swift
enum Suit { 
    case Spades, Hearts, Diamonds, Clubs 
        func simpleDescription() -> String { 
        switch self { 
            case .Spades: 
                return "spades" 
            case .Hearts: 
                return "hearts" 
            case .Diamonds: 
                return "diamonds" 
            case .Clubs: 
                return "clubs" 
        } 
    } 
} 
let hearts = Suit.Hearts 
let heartsDescription = hearts.simpleDescription() 
```
除了可以**关联方法**，枚举还支持**在其成员上关联值**，同一枚举的不同成员可以有不同的关联的值：
```swift
enum ServerResponse { 
    case Result(String, String) 
    case Error(String) 
} 
  
let success = ServerResponse.Result("6:00 am", "8:09 pm") 
let failure = ServerResponse.Error("Out of cheese.") 
  
switch success { 
    case let .Result(sunrise, sunset): 
        let serverResponse = "Sunrise is at \(sunrise) and sunset is at \(sunset)." 
    case let .Error(error): 
        let serverResponse = "Failure... \(error)" 
} 
```

#####2）结构
**Swift**使用**struct**关键字**创建结构**。结构支持构造器和方法这些类的特性。

**结构**和**类**的**最大区别**在于：
- *结构的实例按值传递（passed by value）。*
- *类的实例按引用传递（passed by reference）。*

```swift
struct Card { 
    var rank: Rank 
    var suit: Suit 
    func simpleDescription() -> String { 
        return "The \(rank.simpleDescription()) of \(suit.simpleDescription())" 
    } 
} 
let threeOfSpades = Card(rank: .Three, suit: .Spades) 
let threeOfSpadesDescription = threeOfSpades.simpleDescription() 
```

####7、协议（protocol）和扩展（extension）
#####1）协议
**Swift**使用**protocol**定义**协议**：
```swift
protocol ExampleProtocol { 
    var simpleDescription: String { get } 
    mutating func adjust() 
}
```
 
**类型**、**枚举**和**结构**都可以**实现**（adopt）**协议**：
```swift
class SimpleClass: ExampleProtocol { 
    var simpleDescription: String = "A very simple class." 
    var anotherProperty: Int = 69105 
    func adjust() { 
        simpleDescription += " Now 100% adjusted." 
    } 
} 
var a = SimpleClass() 
a.adjust() 
let aDescription = a.simpleDescription 
  
struct SimpleStructure: ExampleProtocol { 
    var simpleDescription: String = "A simple structure" 
    mutating func adjust() { 
        simpleDescription += " (adjusted)" 
    } 
} 
var b = SimpleStructure() 
b.adjust() 
let bDescription = b.simpleDescription 
```
 
#####2）扩展
**扩展**用于**在已有的类型上增加新的功能**（比如新的方法或属性）。Swift**使用extension声明扩展**：
```swift
extension Int: ExampleProtocol { 
    var simpleDescription: String { 
        return "The number \(self)" 
    } 
    mutating func adjust() { 
        self += 42 
    } 
} 
7.simpleDescription 
```
 
####8、泛型（generics）
**Swift**使用**`<>`**来**声明泛型函数**或**泛型类型**：
```swift
func repeat<ItemType>(item: ItemType, times: Int) -> ItemType[] { 
    var result = ItemType[]() 
    for i in 0..times { 
        result += item 
    } 
    return result 
} 
repeat("knock", 4) 
```

**Swift**也支持在**类、枚举和结构中使用泛型**：
```swift
// Reimplement the Swift standard library's optional type 
enum OptionalValue<T> { 
    case None 
    case Some(T) 
} 
var possibleInteger: OptionalValue<Int> = .None 
possibleInteger = .Some(100) 
```

有时需要对泛型做一些需求（requirements），比如需求某个泛型类型实现某个接口或继承自某个特定类型、两个泛型类型属于同一个类型等等，Swift通过where描述这些需求：
```swift
func anyCommonElements <T, U where T: Sequence, U: Sequence, T.GeneratorType.Element: Equatable, T.GeneratorType.Element == U.GeneratorType.Element> (lhs: T, rhs: U) -> Bool { 
    for lhsItem in lhs { 
        for rhsItem in rhs { 
            if lhsItem == rhsItem { 
                return true 
            } 
        } 
    } 
    return false 
} 
anyCommonElements([1, 2, 3], [3]) 
```
 
###个人感受
 
**Swift 吸收了大量其它编程语言中的元素**，这些元素包括但不限于：
- 1、属性（Property）、可空值（Nullable type）语法和泛型（Generic Type）语法源自C#。
- 2、格式风格与Go相仿（没有句末的分号，判断条件不需要括号）。
- 3、Python风格的当前实例引用语法（使用self）和列表字典声明语法。
- 4、Haskell风格的区间声明语法（比如1..3，1...3）。
- 5、协议和扩展源自Objective-C（自家产品随便用）。
- 6、枚举类型很像Java（可以拥有成员或方法）。
- 7、class和struct的概念和C#极其相似。
 
**Swift去除了一些隐式操作**，比如**隐式类型转换**和**隐式方法重载**这两个坑。
 
