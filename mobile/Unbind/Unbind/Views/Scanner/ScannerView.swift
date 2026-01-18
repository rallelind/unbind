import SwiftUI

enum ScannerStatus {
    case idle
    case detecting
    case extracting
    case complete
    case error(String)
}

struct ScannerView: View {

    @State private var status: ScannerStatus = .idle

    var body: some View {
        VStack(spacing: 0) {
            Capsule()
                .fill(Color.stone500)
                .frame(width: 48, height: 6)
                .padding(.top, 12)
                .padding(.bottom, 20)

            switch status {
            case .idle:
                IdleView()
            case .detecting:
                EmptyView()
            case .extracting:
                EmptyView()
            case .complete:
                EmptyView()
            case .error(let message):
                EmptyView()
            }

        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.stone800)
        .presentationDetents([.large])
        .presentationDragIndicator(.hidden)
    }
}
