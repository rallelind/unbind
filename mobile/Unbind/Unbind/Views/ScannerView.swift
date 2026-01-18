import SwiftUI

struct ScannerView: View {
    var body: some View {
        VStack(spacing: 0) {
            Capsule()
                .fill(Color.stone500)
                .frame(width: 48, height: 6)
                .padding(.top, 12)
                .padding(.bottom, 20)
            
            Image("Camera")
                .resizable()
                .scaledToFit()
                .frame(height: 200)
                .padding(.bottom, 24)

            Text("Scan your bookshelf")
                .font(.custom("Playfair Display", size: 28))
                .foregroundStyle(Color.stone100)
                .padding(.bottom, 12)

            Text("Take a photo of your bookshelf with the book spines clearly visible.")
                .font(.system(size: 14, design: .serif))
                .foregroundStyle(Color.stone400)
                .multilineTextAlignment(.center)
                .padding(.bottom, 24)

            HStack(spacing: 12) {
                Label("Vertical spines", systemImage: "arrow.up")
                    .badgeStyle()
                
                Label("Good lighting", systemImage: "sun.max")
                    .badgeStyle()
            }
            .padding(.bottom, 32)

            Button("Take Photo") {
                // TODO: Take photo
            }
            .buttonStyle(PrimaryButtonStyle())
            .padding(.horizontal, 24)
            .padding(.top, 12)

            Button("Choose from Library") {
                // TODO: Choose from library
            }
            .buttonStyle(SecondaryButtonStyle())
            .padding(.horizontal, 24)
            .padding(.top, 12)

            Spacer()

        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.stone800)
        .presentationDetents([.large])
        .presentationDragIndicator(.hidden)
    }
}
