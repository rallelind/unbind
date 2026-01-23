import Foundation

struct BoundingBox: Codable {
    let x: Double
    let y: Double
    let width: Double
    let height: Double
}

struct BookCandidate: Codable, Identifiable {
    var id: String { "\(title)-\(score)" }

    let title: String
    let author: String?
    let coverImage: String?
    let score: Double
}

struct DetectionBook: Codable {
    let id: String
    let boundingBox: BoundingBox
    let detectionConfidence: Double
}

struct ExtractionResult: Codable {
    let id: String
    let title: String?
    let author: String?
    let verified: Bool
    let coverImage: String?
    let verifiedTitle: String?
    let verifiedAuthor: String?
    let candidates: [BookCandidate]
    let failureReason: String?
}

enum BookStatus {
    case pending
    case extracted
    case accepted
}

struct Book: Identifiable {
    let id: String
    let boundingBox: BoundingBox
    let detectionConfidence: Double
    var title: String?
    var author: String?
    var verified: Bool = false
    var coverImage: String?
    var verifiedTitle: String?
    var verifiedAuthor: String?
    var candidates: [BookCandidate] = []
    var failureReason: String?
    var status: BookStatus = .pending
    
    init(from detection: DetectionBook) {
        self.id = detection.id
        self.boundingBox = detection.boundingBox
        self.detectionConfidence = detection.detectionConfidence
    }
    
    mutating func apply(_ extraction: ExtractionResult) {
        self.title = extraction.verifiedTitle ?? extraction.title
        self.author = extraction.verifiedAuthor ?? extraction.author
        self.verified = extraction.verified
        self.coverImage = extraction.coverImage
        self.verifiedTitle = extraction.verifiedTitle
        self.verifiedAuthor = extraction.verifiedAuthor
        self.candidates = extraction.candidates
        self.failureReason = extraction.failureReason
        self.status = .extracted
    }
}

enum AnalyzerStatus {
    case idle
    case detecting
    case extracting
    case complete
    case error(String)
}
