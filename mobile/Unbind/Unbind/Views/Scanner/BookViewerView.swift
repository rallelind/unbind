import SwiftUI

struct BookViewerView: View {
    @Environment(AnalyzerViewModel.self) var viewModel

    var allAccepted: Bool {
        return viewModel.books.count > 0 && viewModel.books.allSatisfy { $0.status == .accepted }
    }

    var body: some View {
        if allAccepted {
            CompletionView()
        } else {
            @Bindable var viewModel = viewModel

            VStack(spacing: 0) {
                HStack {
                    Text("Book \(viewModel.currentBookIndex + 1) of \(viewModel.books.count)")
                        .font(.system(size: 14))
                        .foregroundStyle(Color.stone400)

                    Spacer()

                    // Status indicator
                    if viewModel.status == .extracting {
                        HStack(spacing: 6) {
                            Text("Extracting \(viewModel.extractedCount)/\(viewModel.books.count)")
                                .font(.system(size: 14))
                                .foregroundStyle(Color.stone300)
                            ProgressView()
                                .scaleEffect(0.8)
                        }
                    } else {
                        Text("All books extracted")
                            .font(.system(size: 14))
                            .foregroundStyle(Color.stone300)
                    }
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)

                // Swipeable book cards
                TabView(selection: $viewModel.currentBookIndex) {
                    ForEach(Array(viewModel.books.enumerated()), id: \.offset) { index, book in
                        BookCardView(book: book)
                            .tag(index)
                    }
                }
                .tabViewStyle(.page(indexDisplayMode: .never))

                // Navigation controls
                BookNavigationView()
            }
        }
    }
}
