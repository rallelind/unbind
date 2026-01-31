import SwiftUI

struct BookNavigationView: View {
    @Environment(AnalyzerViewModel.self) var viewModel

    var body: some View {
        HStack(spacing: 6) {
            ForEach(Array(viewModel.books.enumerated()), id: \.offset) { index, book in
                Button {
                    withAnimation {
                        viewModel.setCurrentBook(index)
                    }
                } label: {
                    Capsule()
                        .fill(dotColor(for: book, at: index))
                        .frame(
                            width: index == viewModel.currentBookIndex ? 16 : 8,
                            height: 8
                        )
                }
                .buttonStyle(.plain)
            }
        }
        .animation(.easeInOut(duration: 0.15), value: viewModel.currentBookIndex)
        .padding(.vertical, 12)
    }

    private func dotColor(for book: Book, at index: Int) -> Color {
        if index == viewModel.currentBookIndex {
            return Color.stone100
        } else if book.status == .pending {
            return Color.stone600
        } else {
            return Color.stone400
        }
    }
}
