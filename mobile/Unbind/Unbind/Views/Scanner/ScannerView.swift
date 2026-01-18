import SwiftUI

enum ScannerStatus {
    case idle
    case detecting
    case review
    case error(String)
}

struct ScannerView: View {

    @State private var status: ScannerStatus = .idle
    @State private var selectedImage: UIImage?
    @State private var showCamera = false
    @State private var showLibrary = false

    var body: some View {
        VStack(spacing: 0) {
            Capsule()
                .fill(Color.stone500)
                .frame(width: 48, height: 6)
                .padding(.top, 12)
                .padding(.bottom, 20)

            switch status {
            case .idle:
                IdleView(
                    onTakePhoto: {
                        showCamera = true
                    },
                    onChooseFromLibrary: {
                        showLibrary = true
                    })
            case .detecting:
                DetectingView()
            case .review:
                EmptyView()
            case .error(let message):
                EmptyView()
            }

        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.stone800)
        .presentationDetents([.large])
        .presentationDragIndicator(.hidden)
        .sheet(isPresented: $showCamera) {
            ImagePicker(image: $selectedImage, sourceType: .camera)
        }
        .sheet(isPresented: $showLibrary) {
            ImagePicker(image: $selectedImage, sourceType: .photoLibrary)
        }
        .onChange(of: selectedImage) { oldValue, newValue in
            if newValue != nil {
                status = .detecting
                // Later: trigger the API call here
            }
        }
    }
}
