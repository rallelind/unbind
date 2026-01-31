import SwiftUI

struct BookCoverView: View {
    let coverUrl: String?
    var width: CGFloat = 64
    var height: CGFloat = 96
    
    private var secureUrl: URL? {
        guard let urlString = coverUrl else { return nil }
        // Convert http to https for iOS ATS compliance
        let secureString = urlString.replacingOccurrences(of: "http://", with: "https://")
        return URL(string: secureString)
    }
    
    var body: some View {
        Group {
            if let url = secureUrl {
                AsyncImage(url: url) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    Color.stone600
                }
            } else {
                Color.stone600
                    .overlay {
                        Text("?")
                            .foregroundStyle(Color.stone400)
                    }
            }
        }
        .frame(width: width, height: height)
        .clipShape(RoundedRectangle(cornerRadius: 4))
    }
}