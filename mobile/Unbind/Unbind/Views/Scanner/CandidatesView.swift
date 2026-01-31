import SwiftUI

struct CandidatesView: View {
    let count: Int
    @Binding var currentIndex: Int
    
    var isFirst: Bool { currentIndex == 0 }
    var isLast: Bool { currentIndex == count - 1 }
    
    var body: some View {
        HStack {
            Text("\(currentIndex + 1) of \(count) matches")
                .font(.system(size: 14))
                .foregroundStyle(Color.stone400)
            
            Spacer()
            
            HStack(spacing: 4) {
                Button {
                    withAnimation(.easeInOut(duration: 0.2)) {
                        currentIndex = max(0, currentIndex - 1)
                    }
                } label: {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 14, weight: .medium))
                        .frame(width: 28, height: 28)
                }
                .disabled(isFirst)
                .opacity(isFirst ? 0.3 : 1)
                
                Button {
                    withAnimation(.easeInOut(duration: 0.2)) {
                        currentIndex = min(count - 1, currentIndex + 1)
                    }
                } label: {
                    Image(systemName: "chevron.right")
                        .font(.system(size: 14, weight: .medium))
                        .frame(width: 28, height: 28)
                }
                .disabled(isLast)
                .opacity(isLast ? 0.3 : 1)
            }
            .buttonStyle(.plain)
            .foregroundStyle(Color.stone400)
        }
    }
}