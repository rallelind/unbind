import SwiftUI

struct DetectingView: View {

    var body: some View {
        VStack(spacing: 0) {
            ProgressView()
                .progressViewStyle(CircularProgressViewStyle(tint: Color.stone100))
                .scaleEffect(1.5)
                .padding(.bottom, 16)

            Text("Detecting books...")
                .font(.system(size: 18, weight: .medium))
                .foregroundStyle(Color.stone300)
                .padding(.bottom, 8)

            Text("This may take a few seconds")
                .font(.system(size: 14))
                .foregroundStyle(Color.stone500)

        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
