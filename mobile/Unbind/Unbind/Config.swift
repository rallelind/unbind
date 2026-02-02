import Foundation

enum Config {
    static let apiBaseUrl: String = {
        #if targetEnvironment(simulator)
        return "http://localhost:3000/api"
        #else
        return "https://unbind.up.railway.app/api"
        #endif
    }()
}
