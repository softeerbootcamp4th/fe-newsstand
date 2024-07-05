/**
 * @description 입력받은 텍스트를 자체 마크다운 문법에 맞게 변환하는 함수
 * 
 * @example 
 * * \n -> <br/>
 * * {텍스트} -> <strong>텍스트</strong>
 */
export function convertToMarkdown(text, textSize) {
    let convertedText = text;

    /**
     * \n -> <br/>
     */
    convertedText = convertedText.replace(/\n/g, "<br/>");

    /**
     * {텍스트} -> <strong>텍스트</strong>
     */
    convertedText = convertedText
                    .replace(/{/g, `<p class="text--strong text__bold${textSize}">`)
                    .replace(/}/g, "</p>");
    
    return `<span class="text--default text__medium${textSize}">${convertedText}</span>`
}
