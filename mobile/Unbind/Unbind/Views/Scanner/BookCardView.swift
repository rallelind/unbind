import SwiftUI

struct BookCardView: View {
    let book: Book
    @Environment(AnalyzerViewModel.self) var viewModel
    
    @State private var candidateIndex = 0
    
    var hasCandidates: Bool { book.candidates.count > 0 }
    
    var currentCandidate: BookCandidate? {
        hasCandidates ? book.candidates[candidateIndex] : nil
    }
    
    var displayTitle: String? { currentCandidate?.title ?? book.title }
    var displayAuthor: String? { currentCandidate?.author ?? book.author }
    var displayCover: String? { currentCandidate?.coverImage ?? book.coverImage }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            if book.status == .pending {
                HStack(spacing: 12) {
                    ProgressView()
                        .tint(Color.stone400)
                    Text("Extracting book info...")
                        .font(.system(size: 14))
                        .foregroundStyle(Color.stone400)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 40)
            } else {
                VStack(spacing: 12) {
                    // Candidates navigation
                    if hasCandidates && book.status != .accepted {
                        CandidatesView(count: book.candidates.count, currentIndex: $candidateIndex)
                    }
                    
                    // Book info
                    HStack(alignment: .top, spacing: 12) {
                        BookCoverView(coverUrl: displayCover)

                        VStack(alignment: .leading, spacing: 4) {
                            if book.status == .accepted {
                                HStack(spacing: 4) {
                                    Image(systemName: "checkmark")
                                        .font(.system(size: 12))
                                    Text("Accepted")
                                        .font(.system(size: 12))
                                }
                                .foregroundStyle(Color.green)
                                .padding(.bottom, 2)
                            }

                            Text("Title")
                                .font(.system(size: 12))
                                .foregroundStyle(Color.stone500)
                            Text(displayTitle ?? "Unknown")
                                .font(.custom("PlayfairDisplay", size: 18))
                                .foregroundStyle(Color.stone100)

                            Text("Author")
                                .font(.system(size: 12))
                                .foregroundStyle(Color.stone500)
                                .padding(.top, 4)
                            Text(displayAuthor ?? "Unknown")
                                .font(.system(size: 14))
                                .foregroundStyle(Color.stone300)
                        }

                        Spacer()
                    }

                    Spacer(minLength: 12)

                    // Accept button
                    if book.status != .accepted {
                        Button {
                            withAnimation {
                                viewModel.acceptBook(id: book.id)
                                viewModel.nextBook()
                            }
                        } label: {
                            Label("Accept", systemImage: "checkmark")
                        }
                        .buttonStyle(PrimaryButtonStyle())
                    }
                }
                .padding(16)
            }
        }
        .frame(maxWidth: .infinity)
        .background(
            Color.stone800.opacity(0.5)
                .allowsHitTesting(false)
        )
        .onChange(of: book.id) {
            candidateIndex = 0
        }
    }
}