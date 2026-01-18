import SwiftUI

struct IdleView: View {

    var onTakePhoto: () -> Void
    var onChooseFromLibrary: () -> Void
    
    var body: some View {
        Image("Camera")
            .resizable()
            .scaledToFit()
            .frame(height: 260)
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
            onTakePhoto()
        }
        .buttonStyle(PrimaryButtonStyle())
        .padding(.horizontal, 24)
        .padding(.top, 12)

        Button("Choose from Library") {
            onChooseFromLibrary()
        }
        .buttonStyle(SecondaryButtonStyle())
        .padding(.horizontal, 24)
        .padding(.top, 12)

        Spacer()
    }
}
