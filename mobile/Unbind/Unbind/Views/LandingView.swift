import SwiftUI

struct LandingView: View {
    @Environment(AnalyzerViewModel.self) var viewModel
    @State private var isShowingScanner = false

    var buttonText: String {
        let pendingCount = viewModel.books.filter { $0.status != .accepted }.count
        
        switch viewModel.status {
        case .detecting:
            return "Detecting..."
        case .extracting:
            return "Extracting \(viewModel.extractedCount)/\(viewModel.books.count)"
        case .complete where pendingCount > 0:
            return "Review \(pendingCount) Book\(pendingCount == 1 ? "" : "s")"
        default:
            return "Scan Bookshelf"
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            Text("Unbind")
                .font(.custom("Playfair Display", size: 52))
                .foregroundStyle(Color.stone100)
                .tracking(-0.5)
            
            Image("BookShelf")
                .resizable()
                .scaledToFit()
                .frame(width: 200, height: 168)
                .shadow(color: .black.opacity(0.3), radius: 12, x: 0, y: 4)
                .padding(.top, 24)
                .padding(.bottom, 48)
            
            Text("Simply take a photo of your bookshelf and we'll identify every title to unbind them from the physical shelf and adding them to your digital library.")
                .font(.system(size: 18, design: .serif))
                .foregroundStyle(Color.stone400)
                .multilineTextAlignment(.center)
                .lineSpacing(8)
                .padding(.horizontal, 32)
            
            Button {
                isShowingScanner = true
            } label: {
                Text(buttonText)
                    .font(.system(size: 14, weight: .medium))
                    .foregroundStyle(Color.stone300)
                    .padding(.horizontal, 24)
                    .padding(.vertical, 12)
                    .background(Color.stone700)
                    .clipShape(Capsule())
            }
            .padding(.top, 40)
        }
        .sheet(isPresented: $isShowingScanner) {
            ScannerView()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(.horizontal, 24)
        .background(Color.stone800)
    }
}

#Preview {
    LandingView()
}