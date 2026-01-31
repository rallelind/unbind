import SwiftUI

struct BoundingBoxImageView: View {
    let image: UIImage
    let books: [Book]
    let currentIndex: Int
    var onSelectBook: ((Int) -> Void)?
    
    var body: some View {
        GeometryReader { geometry in
            let imageAspect = image.size.width / image.size.height
            let containerAspect = geometry.size.width / geometry.size.height
            
            let imageSize: CGSize = {
                if imageAspect > containerAspect {
                    let width = geometry.size.width
                    return CGSize(width: width, height: width / imageAspect)
                } else {
                    let height = geometry.size.height
                    return CGSize(width: height * imageAspect, height: height)
                }
            }()
            
            ZStack(alignment: .topLeading) {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFit()
                    .frame(width: imageSize.width, height: imageSize.height)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                
                ForEach(Array(books.enumerated()), id: \.offset) { index, book in
                    let box = book.boundingBox
                    let boxWidth = imageSize.width * box.width / 100
                    let boxHeight = imageSize.height * box.height / 100
                    let boxX = imageSize.width * box.x / 100
                    let boxY = imageSize.height * box.y / 100
                    
                    RoundedRectangle(cornerRadius: 4)
                        .stroke(
                            index == currentIndex ? Color.stone100 : Color.clear,
                            lineWidth: 2
                        )
                        .background(Color.white.opacity(0.001))
                        .frame(width: boxWidth, height: boxHeight)
                        .offset(x: boxX, y: boxY)
                        .onTapGesture {
                            onSelectBook?(index)
                        }
                }
            }
            .frame(width: imageSize.width, height: imageSize.height)
            .position(x: geometry.size.width / 2, y: geometry.size.height / 2)
        }
    }
}