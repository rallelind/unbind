import SwiftUI

struct BadgeStyle: ViewModifier {
    func body(content: Content) -> some View {
        content 
            .font(.system(size: 12, weight: .medium))
            .foregroundStyle(Color.stone400)
            .padding(.horizontal, 12)
            .padding(.vertical, 7)
            .background(Color.stone700.opacity(0.5))
            .clipShape(Capsule())
    }
}

extension View {
    func badgeStyle() -> some View {
        modifier(BadgeStyle())
    }
}