use serde::Deserialize;


#[derive(Deserialize)]
pub struct DownloadRequest {
    pub url: String,
}