import SwiftUI

struct CompletionView: View {
    @Environment(AnalyzerViewModel.self) var viewModel

    var body: some View {
        VStack(spacing: 0) {
            // Success icon
            Circle()
                .fill(Color.green.opacity(0.2))
                .frame(width: 56, height: 56)
                .overlay(
                    Image(systemName: "checkmark")
                        .font(.system(size: 28, weight: .semibold))
                        .foregroundStyle(Color.green)
                )
                .padding(.bottom, 12)

            // Title
            Text("All done!")
                .font(.custom("Playfair Display", size: 24))
                .foregroundStyle(Color.stone100)
                .padding(.bottom, 4)

            // Subtitle
            Text(
                "\(viewModel.books.count) book\(viewModel.books.count == 1 ? "" : "s") added to your library"
            )
            .font(.system(size: 14))
            .foregroundStyle(Color.stone400)
            .padding(.bottom, 16)

            // Reset button
            Button {
                viewModel.reset()
            } label: {
                Label("Scan Another Shelf", systemImage: "arrow.counterclockwise")
            }
            .buttonStyle(SecondaryButtonStyle())
            .padding(.horizontal, 24)
            .padding(.bottom, 24)

            // Book list
            ScrollView {
                VStack(spacing: 8) {
                    ForEach(viewModel.books) { book in
                        BookListItem(book: book)
                    }
                }
                .padding(.horizontal, 16)
            }
        }
        .padding(.top, 32)
    }
}

struct BookListItem: View {
    let book: Book

    var body: some View {
        HStack(spacing: 12) {
            // Cover placeholder (or AsyncImage for real cover)
            BookCoverView(coverUrl: book.coverImage, width: 40, height: 56)

            // Title & Author
            VStack(alignment: .leading, spacing: 2) {
                Text(book.title ?? "Unknown title")
                    .font(.custom("Playfair Display", size: 14))
                    .foregroundStyle(Color.stone100)
                    .lineLimit(1)

                Text(book.author ?? "Unknown author")
                    .font(.system(size: 12))
                    .foregroundStyle(Color.stone400)
                    .lineLimit(1)
            }

            Spacer()

            // Checkmark
            Image(systemName: "checkmark")
                .font(.system(size: 14))
                .foregroundStyle(Color.green)
        }
        .padding(12)
        .background(Color.stone700.opacity(0.3))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.stone700.opacity(0.5), lineWidth: 1)
        )
    }
}
