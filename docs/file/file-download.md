# 文件下载

## 1.下载同源文件

使用 a 标签的 download 属性，可下载同源文件

> 注意：使用 a 标签的 download 属性，下载非同源图片，download 属性会失效，从而转变成跳转

```html
<a download href="http://localhost:3000/img/table_render_1.dd0bb72f.png"
  >点击下载同源的图片</a
>
```

## 2.下载非同源文件

通过将获取到的二进制数据 blob，转成 Object URL 地址，再使用 a 标签的 download 属性下载同源文件

> 理解：URL.createObjectURL() 可以为文件生成一个同源 url 地址

```html
<button
  type="primary"
  @click="
          download(
            'https://img0.baidu.com/it/u=2517394238,2890851596&fm=26&fmt=auto&gp=0.jpg'
          )
        "
>
  通过Blob完成图片的下载
</button>
```

```javascript
  download(url: string) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.send()
    xhr.onload = function () {
      const fileBlob = xhr.response
      console.log('获取到的blob二进制数据', fileBlob)
      //将Blob转成Object URL地址
      const fileUrl = URL.createObjectURL(fileBlob)
      console.log('blob转成的url', fileUrl)
      const elementA = document.createElement('a')
      elementA.setAttribute('href', fileUrl)
      elementA.innerHTML = '下载'
      elementA.setAttribute('download', '下载的图片')
      elementA.click()
    }
  }
```

## 3.通过 canvas 可下载跨域图片

```html
<button
  type="primary"
  @click="
          downloadImgByCanvas(
            'https://img0.baidu.com/it/u=2517394238,2890851596&fm=26&fmt=auto&gp=0.jpg'
          )
        "
>
  通过canvas下载跨域图片
</button>
```

```javascript
  //通过canvas解决下载跨域图片
  downloadImgByCanvas(imgSrc: string, imgName?: string): void {
    let image = new Image()
    //解决跨域Canvas污染问题
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
      let canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      let context: any = canvas.getContext('2d')
      context.drawImage(image, 0, 0, image.width, image.height)
      let url = canvas.toDataURL('image/png')
      let a = document.createElement('a')
      let event = new MouseEvent('click')
      a.download = imgName || '下载的图片'
      a.href = url
      a.dispatchEvent(event)
    }
    image.src = imgSrc
  }
```
