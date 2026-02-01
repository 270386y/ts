package com.example.backend.common.exception;

public class ResourceNotFoundException extends RuntimeException {

    private final String resource;
    private final String key;
    private final Object value;

    // 既存の呼び方： new ResourceNotFoundException("employee", "id", id)
    public ResourceNotFoundException(String resource, String key, Object value) {
        super(resource + " not found: " + key + "=" + value);
        this.resource = resource;
        this.key = key;
        this.value = value;
    }

    // ★追加：ShiftServiceが使う呼び方： new ResourceNotFoundException("store not found ...")
    public ResourceNotFoundException(String message) {
        super(message);
        this.resource = null;
        this.key = null;
        this.value = null;
    }

    public String getResource() { return resource; }
    public String getKey() { return key; }
    public Object getValue() { return value; }
}
