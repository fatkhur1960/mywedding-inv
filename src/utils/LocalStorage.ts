class LocalStorage {
    set = (key: string, value: Object) => {
        if (this.checkifSupport()) {
            try {
                window.localStorage.setItem(key, JSON.stringify(value));
                window.dispatchEvent(new Event("writeStorage"));
            } catch (e) {
                throw new TypeError('Exceeded Storage Quota!');
            }
        } else {
            throw new TypeError("No support. Use a fallback such as browser cookies or store on the server.");
        }
    }

    get = <T>(key: string): T | null => {
        if (this.checkifSupport()) {
            var data = window.localStorage.getItem(key);
            if (data) {
                try {
                    return JSON.parse(data) as T;
                } catch (error) {
                    return data as T
                }
            }
        }

        return null
    }

    remove = (key: string) => {
        if (this.checkifSupport()) {
            window.localStorage.removeItem(key);
            return true;
        }

        return false
    }

    checkifSupport = () => {
        return typeof window !== 'undefined'
    }
}

export default LocalStorage